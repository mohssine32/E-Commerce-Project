import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import {redis} from "../lib/redis.js"

//access token  : et utiliser pour acceder a des api protéger 
//refresh token : Pour éviter de demander à l'utilisateur de se reconnecter souvent.
//refresh token : Permet de générer un nouvel access token lorsque celui-ci expire. 
const generateTokens = (userId) => {
	const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "15m",
	});

	const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "7d",
	});

	return { accessToken, refreshToken };
};
//storeRefreshToken : stocker de manière sécurisée un refresh token
const storeRefreshToken = async (userId, refreshToken) => {
	await redis.set(`refresh_token:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60); // 7days
};


const setCookies = (res, accessToken, refreshToken) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",        // true en prod HTTPS
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // "none" pour cross-site prod
  };

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
  });
};

export const signup =  async (req, res) => {
    const {email, password, name} = req.body
    try {
      const userexists = await User.findOne({email})
    if(userexists) {
      return  res.status(400).json({message: "user alredy exist"});
    }

    const user = await User.create({ name, email, password })
   //authenticate 
const {accessToken, refreshToken} = generateTokens(user._id)
await storeRefreshToken(user._id, refreshToken);
setCookies(res, accessToken, refreshToken);

    res.status(201).json({user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }, message: "user creates successfuly"});

    } catch (error) {
    console.log("Error in signup controller", error.message);
		res.status(500).json({ message: error.message });
    }
   }



export const login =  async (req, res) => {
   try {
    console.log("run login 1 ")
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (user && (user.comparePassword(password))) {
      const {accessToken, refreshToken} = generateTokens(user._id)
      await storeRefreshToken(user._id, refreshToken)
      setCookies(res,accessToken,refreshToken);
      console.log("login login 2")
     res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
     })
    }
    else {
      res.status(401).json({ message: "invalid email or message" });
    }   
   } catch (error) {
    console.log("error in login controllers", error.message);
    res.status(500).json({ message:error.message });
   }
}


export const logout =  async (req, res) => {
try {
  const refreshToken = req.cookies.refreshToken ;
  if (refreshToken) {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    await redis.del(`refresh_token:${decoded.userId}`)
  }
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "logged out succesufully" });
} catch (error) {
  console.log("Error in logout controller", error.message);
  res.status(500).json({ message: "server error", error: error.message });
}
}


export const refreshToken = async (req, res) => {
try {
  const refreshToken = req.cookies.refreshToken ;

  if (!refreshToken) {
    return res.status(401).json({ message: "no refresh provided" });
  }

const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
const storedToken = await redis.get(`refresh_token:${decoded.userId}`);


if (storedToken !== refreshToken) {
  return res.status(401).json({ message: "invalid refresh token"})
}

const accessToken = jwt.sign({ userId: decoded.userId}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m"});

res.cookie("accessToken", accessToken, {
  httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
})
res.json({message: "Token refreshed successfully"})

} catch (error) {
  
console.log("error in refreshToken controller :",error.message);
res.status(500).json({ message: "server error", error: error.message });
}
}


export const getProfile = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};


// refreshtoken :  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2RhODQ0YmEwNDc1ZGI2MWVjNzgzMmQiLCJpYXQiOjE3NDIzNzM5OTksImV4cCI6MTc0MjM3NDg5OX0.-MJco_EY59iKkx1JNnLN_x44
// refreshtoken : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2RhODQ0YmEwNDc1ZGI2MWVjNzgzMmQiLCJpYXQiOjE3NDIzNzM5ODQsImV4cCI6MTc0Mjk3ODc4NH0.CNCL-TJcpc5GOcC9-bzDPElyA55VODK550quy7nu_sw

// todo implement get profile later
// export const getprofile = async (req, res) => {}























  