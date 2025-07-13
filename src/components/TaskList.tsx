import {List} from "antd";
import {tasks} from "../mock_data/mock_tasks.ts";

function TaskList(){
    return(
        <List
            dataSource={tasks}
            renderItem={(item) =>
                <List.Item>
                    <p>{item.title}</p>
                </List.Item>
        }
        />
    )
}

export default TaskList