import {Route, Routes} from 'react-router-dom';
import {Layout} from "antd";
import styles from './App.module.sass';
import 'antd/dist/reset.css';
import Tasks from "./pages/Tasks.tsx";
import TaskDetails from "./components/TaskDetails.tsx";

const {Header, Content} = Layout;

function App() {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}></Header>
      <Layout>
        <Content className={styles.content}>
          <Routes>
            <Route path="/" element={<Tasks/>}/>
            <Route path="/tasks/:id" element={<TaskDetails/>}/>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
