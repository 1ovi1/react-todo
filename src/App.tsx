import {Route, Routes} from 'react-router-dom';
import {Layout} from "antd";
import styles from './App.module.sass';
import 'antd/dist/reset.css';
import Tasks from "./pages/Tasks.tsx";

const {Header, Content, Sider} = Layout;

function App() {
    return (
        <Layout className={styles.layout}>
            <Header className={styles.header}></Header>
            <Layout>
                <Sider className={styles.sider}>
                </Sider>
                <Content className={styles.content}>
                    <Routes>
                        <Route path="/" element={<Tasks/>}/>
                        <Route path="/tasks" element={<div>Задачи</div>}/>
                        <Route path="/task/:id" element={<div>Детали задачи</div>}/>
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;
