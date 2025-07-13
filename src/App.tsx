import {Route, Routes} from 'react-router-dom';
import {Layout} from "antd";
import styles from './App.module.sass';
import 'antd/dist/reset.css';
import Tasks from "./pages/Tasks.tsx";
import TaskDetails from "./components/TaskDetails.tsx";
import {useEffect, useState } from 'react';

const {Header, Content, Sider} = Layout;

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}></Header>
      <Layout>
        {!isMobile && (
          <Sider className={styles.sider}>
          </Sider>
        )}
        <Content className={styles.content}>
          <Routes>
            <Route path="/" element={<Tasks/>}/>
            <Route path="/task/:id" element={<TaskDetails/>}/>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
