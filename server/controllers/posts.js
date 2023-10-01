import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async(req, res) => {
    try{
        const {userId, description, picturePath} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post ({
            userId, 
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath,
            picturePath,
            likes:{},
            comments: []
        });
        await newPost.save();

        /* we get all the posts and send them back to the front-end because we want the user to see the whole feed */
        const post = await Post.find();
        res.status(201).json(post);
    }
    catch(err){
        res.status(409).json({message: err.message});
    }
};

/* READ */
export const getFeedPosts = async(req, res) => {
    try{
        const post = await Post.find();
        res.status(200).json(post);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
}

export const getUserPosts = async(req, res) => {
    try{
        const {userId} = req.params;
        const post = await Post.find({userId});
        res.status(200).json(post);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
};

/* UPDATE */
export const likePost = async(req, res) => {
    try{
        const {id} = req.params; /* id comes from the query string, userId comes from the body of the request */
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        }
        else{
            post.likes.set(userId,true);
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        )

        res.status(200).json(updatedPost);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }  
};