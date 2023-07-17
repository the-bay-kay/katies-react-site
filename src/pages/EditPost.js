import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { postURL } from "../components/Navbar";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

export function EditPost(props) {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [body, setBody] = useState("");
    const [file, setFile] = useState(null);

    const editorRef = useRef();


    const { id } = useParams();

    useEffect(() => {
        axios
            .get(postURL + String(id))
            .then((response) => {
                setTitle(response.data.title);
                setTags(response.data.tags);
                setBody(response.data.body);
                setFile(response.data.file);
            })
            .catch((error) => {
                console.log(error);
            });
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
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        var postData = new FormData();
        postData.append("title", title);
        postData.append("tags", tags);
        postData.append("body", body);
        postData.append("file", file);
        const sendURL = postURL + '/edit'


        axios
            .post(postURL + `update/` + String(id), postData)
            .then((response) => {
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
        navigate("/");
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

            <lable htmlFor="tags">Tags:</lable>
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
}
