import React from "react";
import PropTypes from "prop-types";
const NewComment = ({ options, onChange, value, content }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div>
            <h2>New comment</h2>
            <div className="mb-4">
                <select
                    className="form-select"
                    name="userId"
                    value={value}
                    onChange={handleChange}
                >
                    <option disabled value="" selected>
                        Выберите пользователя
                    </option>
                    {options &&
                        Object.values(options).map((option) => (
                            <option value={option._id} key={option._id}>
                                {option.name}{" "}
                            </option>
                        ))}
                </select>
            </div>
            <div className="mb-4">
                <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                >
                    Сообщение
                </label>
                <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    name="content"
                    value={content}
                    onChange={handleChange}
                ></textarea>
            </div>
        </div>
    );
};

NewComment.propTypes = {
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func,
    value: PropTypes.string,
    content: PropTypes.string
};

export default NewComment;
