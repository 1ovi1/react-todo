import {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Dropdown,
  Space,
  Card,
  Typography,
  type MenuProps
} from 'antd';
import {
  DownOutlined,
  ExclamationCircleOutlined,
  ArrowUpOutlined,
  MinusCircleOutlined,
  ClockCircleOutlined,
  Loading3QuartersOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import type {Task} from '../interfaces/task.interface.ts';
import {tasks} from '../mock_data/mock_tasks';
import styles from './styles/TaskDetails.module.sass';

const {Title} = Typography;
const {TextArea} = Input;

interface FormValues {
  title: string;
  description: string;
}

const statusOptions: MenuProps['items'] = [
  {
    key: 'todo',
    label: (
      <span className={styles.dropdownLabel}>
        <ClockCircleOutlined style={{color: '#faad14'}}/>
        Todo
      </span>
    ),
  },
  {
    key: 'in-progress',
    label: (
      <span className={styles.dropdownLabel}>
        <Loading3QuartersOutlined style={{color: '#1890ff'}}/>
        In Progress
      </span>
    ),
  },
  {
    key: 'done',
    label: (
      <span className={styles.dropdownLabel}>
        <CheckCircleOutlined style={{color: '#52c41a'}}/>
        Completed
      </span>
    ),
  }
];

const priorityOptions: MenuProps['items'] = [
  {
    key: 'high',
    label: (
      <span className={styles.dropdownLabel}>
        <ExclamationCircleOutlined style={{color: '#ff4d4f'}}/>
        High
      </span>
    ),
  },
  {
    key: 'medium',
    label: (
      <span className={styles.dropdownLabel}>
        <ArrowUpOutlined style={{color: '#faad14'}}/>
        Medium
      </span>
    ),
  },
  {
    key: 'low',
    label: (
      <span className={styles.dropdownLabel}>
        <MinusCircleOutlined style={{color: '#52c41a'}}/>
        Low
      </span>
    ),
  }
];

const categoryOptions: MenuProps['items'] = [
  {
    key: 'bug',
    label: (
      <span className={styles.dropdownLabel}>
        <span className={`${styles.tagDot} ${styles.bug}`}></span>
        Bug
      </span>
    )
  },
  {
    key: 'feature',
    label: (
      <span className={styles.dropdownLabel}>
        <span className={`${styles.tagDot} ${styles.feature}`}></span>
        Feature
      </span>
    )
  },
  {
    key: 'documentation',
    label: (
      <span className={styles.dropdownLabel}>
        <span className={`${styles.tagDot} ${styles.documentation}`}></span>
        Documentation
      </span>
    )
  },
  {
    key: 'refactor',
    label: (
      <span className={styles.dropdownLabel}>
        <span className={`${styles.tagDot} ${styles.refactor}`}></span>
        Refactor
      </span>
    )
  },
  {
    key: 'test',
    label: (
      <span className={styles.dropdownLabel}>
        <span className={`${styles.tagDot} ${styles.test}`}></span>
        Test
      </span>
    )
  }
];

const getOptionLabel = (options: MenuProps['items'], key: string) => {
  const option = options?.find(opt => opt?.key === key);
  return option && 'label' in option ? option.label : key;
};

function TaskDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const [task, setTask] = useState<Task | null>(null);
  const [currentStatus, setCurrentStatus] = useState('');
  const [currentPriority, setCurrentPriority] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');

  useEffect(() => {
    const taskFromState = location.state?.task;
    if (taskFromState) {
      setTask(taskFromState);
      setCurrentStatus(taskFromState.status);
      setCurrentPriority(taskFromState.priority);
      setCurrentCategory(taskFromState.tag);
      form.setFieldsValue({
        title: taskFromState.title,
        description: taskFromState.description || ''
      });
    }
  }, [location.state, form]);

  const handleDropdownChange = (setter: (value: string) => void) =>
    ({key}: { key: string }) => setter(key);

  const handleSave = (values: FormValues) => {
    if (!task) return;

    const taskIndex = tasks.findIndex(t => t.id === task.id);
    if (taskIndex !== -1) {
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: values.title,
        description: values.description,
        status: currentStatus as "todo" | "in-progress" | "done",
        priority: currentPriority as "high" | "medium" | "low",
        tag: currentCategory as "bug" | "feature" | "documentation" | "refactor" | "test"
      };
    }
    navigate('/');
  }

  if (!task) {
    return <div>Задача не найдена</div>;
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title level={2} className={styles.title}>Редактирование задачи</Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          className={styles.form}
        >
          <Form.Item
            label="Название"
            name="title"
            rules={[{required: true, message: 'Введите название задачи'}]}
          >
            <Input
              placeholder="Введите название задачи"
              className={styles.input}
            />
          </Form.Item>

          <Form.Item
            label="Описание"
            name="description"
          >
            <TextArea
              rows={4}
              placeholder="Введите описание задачи"
              className={styles.textarea}
            />
          </Form.Item>

          <div className={styles.dropdownsContainer}>
            <div className={styles.dropdownItem}>
              <label>Статус:</label>
              <Dropdown
                menu={{
                  items: statusOptions,
                  onClick: handleDropdownChange(setCurrentStatus)
                }}
                trigger={['click']}
              >
                <Button className={styles.dropdownButton}>
                  <Space>
                    {getOptionLabel(statusOptions, currentStatus)}
                    <DownOutlined/>
                  </Space>
                </Button>
              </Dropdown>
            </div>

            <div className={styles.dropdownItem}>
              <label>Приоритет:</label>
              <Dropdown
                menu={{
                  items: priorityOptions,
                  onClick: handleDropdownChange(setCurrentPriority)
                }}
                trigger={['click']}
              >
                <Button className={styles.dropdownButton}>
                  <Space>
                    {getOptionLabel(priorityOptions, currentPriority)}
                    <DownOutlined/>
                  </Space>
                </Button>
              </Dropdown>
            </div>

            <div className={styles.dropdownItem}>
              <label>Категория:</label>
              <Dropdown
                menu={{
                  items: categoryOptions,
                  onClick: handleDropdownChange(setCurrentCategory)
                }}
                trigger={['click']}
              >
                <Button className={styles.dropdownButton}>
                  <Space>
                    {getOptionLabel(categoryOptions, currentCategory)}
                    <DownOutlined/>
                  </Space>
                </Button>
              </Dropdown>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <Button onClick={() => navigate('/')} className={styles.cancelButton}>
              Отмена
            </Button>
            <Button type="primary" htmlType="submit" className={styles.saveButton}>
              Сохранить
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default TaskDetails;