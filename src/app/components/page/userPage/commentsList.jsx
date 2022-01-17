import React, { useState, useEffect } from "react";
import NewComment from "./newComment";
import Comment from "./comment";
import PropTypes from "prop-types";
import api from "../../../api";

const CommentsList = ({ user }) => {
    const [newComment, setNewComment] = useState({
        _id: "",
        userId: "",
        pageId: user._id,
        content: "",
        created_at: ""
    });
    const [users, setUsers] = useState();
    const [comments, setComments] = useState();

    useEffect(() => {
        api.comments.fetchCommentsForUser(user._id).then((data) => {
            setComments(data);
        });
    }, [user]);

    useEffect(() => {
        api.users.fetchAll().then((data) =>
            setUsers(
                data.map((e) => {
                    return {
                        name: e.name,
                        _id: e._id
                    };
                })
            )
        );
    }, [users]);

    const commentRemove = (id) => {
        api.comments.remove(id);
        api.comments.fetchCommentsForUser(user._id).then((data) => {
            setComments(data);
        });
    };

    const commentAdd = () => {
        api.comments.add(newComment);
        api.comments.fetchCommentsForUser(user._id).then((data) => {
            setComments(data);
        });
        setNewComment({
            _id: "",
            userId: "",
            pageId: user._id,
            content: "",
            created_at: ""
        });
    };
    const isValid = newComment.userId !== "" && newComment.content !== "";

    const handleChange = (target) => {
        setNewComment((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <NewComment
                        value={newComment.userId}
                        content={newComment.content}
                        onChange={handleChange}
                        options={users}
                    />
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={commentAdd}
                            disabled={!isValid}
                        >
                            Опубликовать
                        </button>
                    </div>
                </div>
            </div>
            {comments && Object.keys(comments).length !== 0 ? (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        {comments
                            .sort((a, b) => a - b)
                            .map((comment) => {
                                return (
                                    <div
                                        className="bg-light card-body  mb-3"
                                        key={comment._id}
                                    >
                                        <div className="row">
                                            <div className="col">
                                                <div className="d-flex flex-start ">
                                                    <Comment
                                                        onDelete={commentRemove}
                                                        comment={comment}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

CommentsList.propTypes = {
    user: PropTypes.object,
    text: PropTypes.string
};

export default CommentsList;
