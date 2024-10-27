import { GraphQLLocalStrategy } from "graphql-passport";
import passport from "passport";
import User from "../../models/user.model.js";

export const configurePassport = async()=>{
        passport.serializeUser((user,done)=>{
           try {
             console.log("serialize User")
             done(null,user.id);
           } catch (error) {
        done(error);           
           }
        })

        passport.deserializeUser(async(id,done)=>{
            try {
                const user = await User.findById(id);
                done(null,user);
            } catch (error) {
                done(error);     
            }
        })

        passport.use(
            new GraphQLLocalStrategy(async(username,password,done)=>{
                try {
                    const user = await User.findOne({username});
                    if(!user) return done(null,false,{message:"Invalid username or password"});
                    const isValid = isPasswordMatched(password);
                    if(!isValid) return done(null,false,{message:"Invalid username or password"});
                    return done(null,user);
                } catch (error) {
                    return done(error);
                    
                }
            })
        )
    
}


