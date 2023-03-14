import { useState, useEffect, useRef } from "react";
import { postURL } from "../components/Navbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // other options, check them out!
import axios from "axios";

const quillModules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
        [{ script: "sub" }, { script: "super" }],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
    ],
};

export const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [body, setBody] = useState("");

    const editorRef = useRef();

    useEffect(() => {
        let editor = editorRef.current.getEditor();
        let observer;
        const checkForNode = setInterval(() => {
            const node = editorRef.current.getEditor().root;
            if (node) {
                observer = new MutationObserver(() => {
                    setBody(editorRef.current.getEditor().root.innerHTML);
                });
                observer.observe(node, { childList: true, subtree: true });
                clearInterval(checkForNode);
            }
        }, 100);

        return () => {
            if (observer) {
                observer.disconnect();
            }
            clearInterval(checkForNode);
        };
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const postData = {
            title,
            tags,
            body,
        };
        try {
            await axios.post(postURL + "add", postData);
            alert("Post added successfully!");
            setTitle("");
            setTags("");
            setBody("");
        } catch (error) {
            alert("Error adding post: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />

            <label htmlFor="tags">Tags:</label>
            <input
                type="text"
                id="tags"
                value={tags}
                onChange={(event) => setTags(event.target.value)}
            />

            <input type="file" />

            <label htmlFor="body">Body:</label>
            <ReactQuill
                ref={editorRef}
                value={body}
                onChange={setBody}
                modules={quillModules}
            />

            <button type="submit">Submit</button>
        </form>
    );
};