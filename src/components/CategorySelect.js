import React from "react";
import Ionicon from "react-ionicons"
import Proptypes from 'prop-types'
import { render } from "enzyme"
import { useState } from "react";
import { eventWrapper } from "@testing-library/user-event/dist/utils";
import { Colors } from "../utility";
const CategorySelect = (props) => {
    const { categories, selectedCategory, onSelectCategory } = props
    const [selectCategoryId, setSelectCategoryId] = useState(selectedCategory && selectedCategory.id);
    const selectCategory = (eventWrapper, category) => {
        setSelectCategoryId(category.id)
        onSelectCategory(category)
    }
    return (
        <div className="category-select-component">
            <div className="row">
                {
                    categories.map((category, index) => {
                        const iconColor = (category.id === selectCategoryId) ? Colors.white : Colors.gray
                        const backColor = (category.id === selectCategoryId) ? Colors.blue : Colors.lightGray
                        const activeClassName = (selectedCategory && selectCategoryId === category.id) ? "category-item col-3 active" : "category-item col-3 "
                        return (
                            <div className={activeClassName} key={index}
                                onClick={eventWrapper => selectCategory(eventWrapper, category)}>
                                <Ionicon
                                    className="rounded-circle"
                                    style={{ backgroundColor: backColor, padding: '5px' }}
                                    fontSize="50px"
                                    color={iconColor}
                                    icon={category.iconName}
                                />
                                <p>{category.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CategorySelect