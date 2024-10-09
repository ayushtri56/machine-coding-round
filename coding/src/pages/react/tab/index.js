import { createContext, useContext, useState } from "react";
import styles from './styles.module.css';

const TabComp = () => {
    function tabClickHandler(e) {
        console.log(e);
    }
    return <Tabs defaultActiveTab="tab1" onClick={tabClickHandler}>
        <TabList>
            <Tab tabId="tab1">Tab1</Tab>
            <Tab tabId="tab2">Tab2</Tab>
            <Tab tabId="tab3">Tab3</Tab>
        </TabList>
        <TabPanel tabId="tab1">Tab1 Content</TabPanel>
        <TabPanel tabId="tab2">Tab2 Content</TabPanel>
        <TabPanel tabId="tab3">Tab3 Content</TabPanel>
    </Tabs>
}

const ActiveTabContext = createContext();

function Tabs({ children, defaultActiveTab, onClick }) {
    const [activeTab, setActiveTab] = useState(defaultActiveTab);
    const tabContextValue = {
        activeTab,
        setActiveTab,
        onClick
    }
    return (
        <ActiveTabContext.Provider value={tabContextValue}>
            <div className={styles.tabs}>{children}</div>
        </ActiveTabContext.Provider>
    )
}

function TabList({ children }) {

    return <div className={styles.tabList}>{children}</div>
}

function Tab({ children, tabId }) {
    const { setActiveTab, onClick } = useContext(ActiveTabContext);
    const tabHandler = (e) => {
        setActiveTab(tabId);
        onClick?.(e);
    }
    return <button className={styles.tab} onClick={tabHandler}>{children}</button>
}

function TabPanel({ children, tabId }) {
    const { activeTab } = useContext(ActiveTabContext);
    if (activeTab !== tabId) {
        return null;
    }
    return <div className={styles.tabPanel}>{children}</div>
}

export default TabComp;