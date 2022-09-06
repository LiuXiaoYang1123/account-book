import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import CategorySelect from "../components/CategorySelect"
import PriceForm from "../components/PriceForm";
import { OUTCOME } from "../utility"
export const categories = [
    {
        "id": 1,
        "name": "实习",
        "type": "income",
        "iconName": "logo-yen"
    },
    {
        "id": 2,
        "name": "旅行",
        "type": "outcome",
        "iconName": "ios-plane"
    }
]
let props_with_category = {
    categories,
    onSelectCategory: () => { },
    selectedCategory: categories[0],
}
const Create = () => {
    const [selectedTab, onSelectTab] = useState(OUTCOME)
    const [selectedCategory, onSelectedCategory] = useState(null)
    const [validationPassed, onValidationPassed] = useState(true)
    const { id } = useParams()
    const selectCategory = (category) => {
        onSelectedCategory(category)
    }
    return (
        <h1>
            This is the create page {id}
            <CategorySelect categories={categories}
                onSelectCategory={selectCategory}
                selectedCategory={selectedCategory} />
            <PriceForm />
        </h1>
    )
}

export default Create