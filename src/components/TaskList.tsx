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
import styles from './styles/TaskList.module.sass';
import type {Task} from "../interfaces/task.interface.ts";
import { useNavigate } from "react-router-dom";

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

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const renderTaskList = (tasks: Task[]) => (
    <List
      dataSource={tasks}
      renderItem={(item: Task) =>
        <List.Item className={styles.listItem}>
          <div className={styles.itemContent}>
            <div className={styles.taskDetails}>
              {getPriorityIcon(item.priority)}
              <span className={styles.taskTitle} onClick={() => handleTaskClick(item)}>
                <a>{item.title}</a>
              </span>
            </div>
            <div className={styles.taskAdditional}>
              <div className={styles.tag}>
                <span className={`${styles.tagDot} ${styles[item.tag]}`}></span>
                {item.tag}
              </div>
              <Divider type="vertical" className={styles.divider} size={"small"}/>
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
          </div>
        </List.Item>
      }
    />
  );

  const collapseItems = [
    {
      key: '1',
      label: (
        <span>
          {getStatusIcon('in-progress')}
          In Progress
        </span>
      ),
      children: renderTaskList(getTasksByStatus('in-progress')),
      className: styles.panelInProgress
    },
    {
      key: '2',
      label: (
        <span>
          {getStatusIcon('todo')}
          Todo
        </span>
      ),
      children: renderTaskList(getTasksByStatus('todo')),
      className: styles.panelTodo
    },
    {
      key: '3',
      label: (
        <span>
          {getStatusIcon('done')}
          Completed
        </span>
      ),
      children: renderTaskList(getTasksByStatus('done')),
      className: styles.panelCompleted
    }
  ];

  return (
    <div>
      <Collapse
        defaultActiveKey={['1', '2', '3']}
        className={styles.statusCollapse}
        ghost
        items={collapseItems}
      />
    </div>
  );
}

export default TaskList;