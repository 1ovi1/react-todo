export interface Task {
    title: string,
    tag: 'bug' | 'feature' | 'documentation' | 'refactor' | 'test',
    status: 'todo' | 'in-progress'
    priority: 'low' | 'medium' | 'high',
}