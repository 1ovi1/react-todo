import type {Task} from "../interfaces/task.interface.ts";

export const tasks: Task[] = [
    {
        title: `Пофиксить поведение формы на странице "Контакты"`,
        tag: "bug",
        status: "todo",
        priority: "low"
    },
    {
        title: "Добавить возможность загрузки аватара пользователя",
        tag: "feature",
        status: "in-progress",
        priority: "medium"
    },
    {
        title: "Создать документацию по API эндпоинтам",
        tag: "documentation",
        status: "todo",
        priority: "high"
    },
    {
        title: "Рефакторинг компонента TaskList для улучшения производительности",
        tag: "refactor",
        status: "in-progress",
        priority: "medium"
    },
    {
        title: "Написать unit-тесты для компонента TaskItem",
        tag: "test",
        status: "todo",
        priority: "high"
    },
    {
        title: "Исправить баг с некорректным отображением статуса задачи",
        tag: "bug",
        status: "in-progress",
        priority: "high"
    },
    {
        title: "Реализовать функцию фильтрации задач по приоритету",
        tag: "feature",
        status: "todo",
        priority: "low"
    }
]