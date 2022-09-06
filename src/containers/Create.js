import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import CategorySelect from "../components/CategorySelect"
import PriceForm from "../components/PriceForm";
import { INCOME, OUTCOME } from "../utility"
import { Tabs, Tab } from "../components/Tabs";
import { testCategories } from "../testData"
import withContext from '../withContext';
const Create = (props) => {
    const [selectedTab, onSelectTab] = useState(OUTCOME)
    const [selectedCategory, onSelectedCategory] = useState(null)
    const [validationPassed, onValidationPassed] = useState(true)
    const { id } = useParams()
    const selectCategory = (category) => {
        onSelectedCategory(category)
    }
    const filterCategories = testCategories.filter(category => category.type === INCOME)
    const { data } = props
    console.log(data)
    return (
        <div className="create-page main-body py-3 px-3 rounded mt-3" style={{ background: '#fff' }}>
            <Tabs onTabChange={() => { }} activeIndex={0}>
                <Tab>支出</Tab>
                <Tab>收入</Tab>
            </Tabs>
            <CategorySelect categories={filterCategories}
                onSelectCategory={selectCategory}
                selectedCategory={selectedCategory} />
            <PriceForm
                onFormSubmit={() => { }}
                onCancelSubmit={() => { }}
            />
        </div>
    )
}

export default withContext(Create)