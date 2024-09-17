import Post from "../models/Post.js";

export const controller = {}

controller.postsList = async (req, res) => {
    try{
        const posts = await Post.find({})
        res.status(200).json(posts)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

controller.getPost = async (req, res) => {
    try{
        const {id} = req.params
        const post = await Post.findById(id)
        res.status(200).json(post)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

controller.addPost = async (req, res) => {
    try{
        const {title, description, thumbnail_url, published} = req.body
        const newPost = new Post({
            title,
            description,
            thumbnail_url,
            published
        })

        await newPost.save()
        res.status(200).json({newPost})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

controller.updatePost = async (req, res) => {
    try{
        const {id} = req.params
        const post = await Post.findByIdAndUpdate(id, req.body)

        if(!post){
            return res.status(404).json({message: "Post not found"})
        }

        const updatedPost = await Post.findById(id)
        res.status(200).json(updatedPost)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

controller.deletePost = async (req, res) => {
    try{
        const {id} = req.params
        const post = Post.findByIdAndDelete(id)

        if(!post){
            return res.status(404).json({message: "Post not found"})
        }

        res.status(200).json({message: "Post deleted successfully"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}