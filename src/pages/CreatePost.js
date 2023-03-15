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
    const [file, setFile] = useState(null);

    const editorRef = useRef();

    useEffect(() => {
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

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        var postData = new FormData();
        postData.append("title", title);
        postData.append("tags", tags);
        postData.append("body", body);
        if (!file) {
            window.alert('Must upload a thumbnail!')
            return
        }
        postData.append("file", file);
        const sendURL = postURL + '/add'

        axios
            .post(sendURL, postData, {
                headers: {
                    'Content-Type': 'multipart/form-data; boundary=${postData._boundary}'
                }})
            .then((response) => {
                window.alert("Post added successfully!")
                    setTitle("");
                    setTags("");
                    setBody("");
                    setFile(null);
            })
            .catch((error) => {
                console.log(error);
            });
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

            <label htmlFor="file">File:</label>
            <input type="file" id="file" onChange={handleFileChange} />

            <label htmlFor="tags">Tags:</label>
            <input
                type="text"
                id="tags"
                value={tags}
                onChange={(event) => setTags(event.target.value)}
            />

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
