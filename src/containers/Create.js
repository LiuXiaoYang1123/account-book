import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import CategorySelect from "../components/CategorySelect"
import PriceForm from "../components/PriceForm";
import { INCOME, OUTCOME } from "../utility"
import { Tabs, Tab } from "../components/Tabs";
import { testCategories } from "../testData"
import withContext from '../withContext';
import withRouter from '../withRouter';

const tabsText = [OUTCOME, INCOME]
const Create = (props) => {
    const { id } = useParams()
    const { items, categories } = props.data
    const editItem = (id && items[id]) ? items[id] : {}
    const [selectedTab, onSelectTab] = useState((id && items[id]) ? categories[items[id].cid].type : OUTCOME)
    const [selectedCategory, onSelectedCategory] = useState((id && items[id]) ? categories[items[id].cid] : null)
    const [validationPassed, onValidationPassed] = useState(true)
    const selectCategory = (category) => {
        onSelectedCategory(category)
    }
    const tabChange = (index) => {
        onSelectTab(tabsText[index])
    }
    const filterCategories = Object.keys(categories)
        .filter(id => categories[id].type === selectedTab)
        .map(id => categories[id])
    const cancelSubmit = () => {
        props.router.navigate('/')
    }
    const submitForm = (data, isEditMode) => {
        if (!isEditMode) {
            // create
            props.actions.createItem(data, selectedCategory.id)
        } else {
            // update
            props.actions.updateItem(data, selectedCategory.id)
        }
        props.router.navigate('/')
    }

    const tabIndex = tabsText.findIndex(text => text === selectedTab)
    return (
        <div className="create-page main-body py-3 px-3 rounded mt-3" style={{ background: '#fff' }}>
            <Tabs onTabChange={tabChange} activeIndex={tabIndex}>
                <Tab>支出</Tab>
                <Tab>收入</Tab>
            </Tabs>
            <CategorySelect categories={filterCategories}
                onSelectCategory={selectCategory}
                selectedCategory={selectedCategory} />
            <PriceForm
                onFormSubmit={submitForm}
                onCancelSubmit={cancelSubmit}
                onSelectCategory={selectedCategory}
                item={editItem}
            />
        </div>
    )
}

export default withRouter(withContext(Create))