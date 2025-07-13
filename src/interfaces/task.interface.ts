export interface Task {
    id: number,
    title: string,
    description?: string
    tag: 'bug' | 'feature' | 'documentation' | 'refactor' | 'test',
    status: 'todo' | 'in-progress' | 'done',
    priority: 'low' | 'medium' | 'high',
}