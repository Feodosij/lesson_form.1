import React, { useEffect, useState } from "react";
import api from "../../../api";
import PropTypes from "prop-types";

const Comment = ({ comment, onDelete }) => {
    const [commentator, setCommentator] = useState();
    useEffect(() => {
        api.users
            .getById(comment.userId)
            .then((data) => setCommentator(data.name));
    }, [comment]);

    const handleRemove = () => {
        onDelete(comment._id);
    };

    const commentData = (date) => {
        const seconds = (Date.now() - date) / 1000;
        if (seconds <= 60) {
            return " 1 минуту назад";
        } else if (seconds <= 300) {
            return " 5 минут назад";
        } else if (seconds <= 600) {
            return " 10 минут назад";
        } else if (seconds / 86400 <= 1) {
            const hours =
                date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
            const minutes =
                date.getMinutes() < 10
                    ? `0${date.getMinutes()}`
                    : date.getMinutes();
            return ` ${hours} : ${minutes}`;
        } else if (seconds / 86400 <= 365) {
            const day =
                date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
            const month =
                date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
            return ` ${day}-${month}`;
        } else {
            const day =
                date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
            const month =
                date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
            const year =
                date.getFullYear() < 10
                    ? `0${date.getFullYear()}`
                    : date.getFullYear();
            return ` ${day}-${month}-${year}`;
        }
    };
    if (commentator) {
        return (
            <>
                <div className="bg-light card-body  mb-3">
                    <div className="row">
                        <div className="col">
                            <div className="d-flex flex-start ">
                                <img
                                    src={`https://avatars.dicebear.com/api/avataaars/${(
                                        Math.random() + 1
                                    )
                                        .toString(36)
                                        .substring(7)}.svg`}
                                    className="rounded-circle"
                                    width="150"
                                />
                                <div className="flex-grow-1 flex-shrink-1">
                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <p className="mb-1">
                                                {commentator}
                                                <span className="small">
                                                    {commentData(
                                                        new Date(
                                                            Number(
                                                                comment.created_at
                                                            )
                                                        )
                                                    )}
                                                </span>
                                            </p>
                                            <button
                                                className="btn btn-sm text-primary d-flex align-items-center"
                                                onClick={handleRemove}
                                            >
                                                <i className="bi bi-x-lg"></i>
                                            </button>
                                        </div>
                                        <p className="small mb-0">
                                            {comment.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return "Loading...";
    }
};

Comment.propTypes = {
    comment: PropTypes.object,
    onDelete: PropTypes.func
};

export default Comment;
