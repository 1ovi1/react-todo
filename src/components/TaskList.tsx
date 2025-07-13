import {List, Collapse, Divider, Button} from "antd";
import {tasks} from "../mock_data/mock_tasks.ts";
import {
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  ArrowUpOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  Loading3QuartersOutlined,
  EditOutlined
} from "@ant-design/icons";
import styles from './TaskList.module.sass';
import type {Task} from "../interfaces/task.interface.ts";
import { useNavigate } from "react-router-dom";

const {Panel} = Collapse;

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case 'high':
      return <ExclamationCircleOutlined className={`${styles.priorityIcon} ${styles.high}`}/>;
    case 'medium':
      return <ArrowUpOutlined className={`${styles.priorityIcon} ${styles.medium}`}/>;
    case 'low':
      return <MinusCircleOutlined className={`${styles.priorityIcon} ${styles.low}`}/>;
    default:
      return <MinusCircleOutlined className={styles.priorityIcon}/>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'in-progress':
      return <Loading3QuartersOutlined style={{color: '#1890ff', marginRight: '8px'}}/>;
    case 'todo':
      return <ClockCircleOutlined style={{color: '#faad14', marginRight: '8px'}}/>;
    case 'done':
      return <CheckCircleOutlined style={{color: '#52c41a', marginRight: '8px'}}/>;
    default:
      return null;
  }
};

function TaskList() {
  const navigate = useNavigate();

  const handleTaskClick = (task: Task) => {
    navigate(`/tasks/${task.id}`, { state: { task } });
  };

  //Это нужно, потому что поставил цель скопировать huly.io
  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  //Это нужно, потому что поставил цель скопировать huly.io
  const renderTaskList = (tasks: Task[]) => (
    <List
      dataSource={tasks}
      renderItem={(item: Task) =>
        <List.Item className={styles.listItem}>
          <div className={styles.itemContent}>
            {getPriorityIcon(item.priority)}
            <div className={styles.taskDetails}>
              <span className={styles.taskTitle} onClick={() => handleTaskClick(item)}
              >
                <a>{item.title}</a>
              </span>
              <div className={styles.tag}>
                <span className={`${styles.tagDot} ${styles[item.tag]}`}></span>
                {item.tag}
              </div>
            </div>
            <Divider type="vertical"/>
            <Button
              type="text"
              icon={<EditOutlined/>}
              size="small"
              className={styles.editButton}
              onClick={() => handleTaskClick(item)}
            >
              Редактировать
            </Button>
          </div>
        </List.Item>
      }
    />
  );

  return (
    <div>
      <Collapse
        defaultActiveKey={['1', '2', '3']}
        className={styles.statusCollapse}
        ghost
      >
        <Panel
          header={
            <span>
        {getStatusIcon('in-progress')}
              In Progress
      </span>
          }
          key="1"
          className={styles.panelInProgress}
        >
          {renderTaskList(getTasksByStatus('in-progress'))}
        </Panel>
        <Panel
          header={
            <span>
        {getStatusIcon('todo')}
              Todo
      </span>
          }
          key="2"
          className={styles.panelTodo}
        >
          {renderTaskList(getTasksByStatus('todo'))}
        </Panel>
        <Panel
          header={
            <span>
        {getStatusIcon('done')}
              Completed
      </span>
          }
          key="3"
          className={styles.panelCompleted}
        >
          {renderTaskList(getTasksByStatus('done'))}
        </Panel>
      </Collapse>
    </div>
  );
}

export default TaskList;