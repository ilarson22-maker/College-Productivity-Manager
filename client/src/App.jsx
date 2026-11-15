import { useState, useEffect } from 'react'
import './App.css'

import {
  getAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment
} from './services/assignmentService'

function App() {
  const [assignments, setAssignments] = useState([])
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [courses, setCourses] = useState([])
  const [courseName, setCourseName] = useState('')
  const [courseCode, setCourseCode] = useState('')

  const [projects, setProjects] = useState([])
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [taskInputs, setTaskInputs] = useState({})

  // Load assignments from the database when the application opens.
  useEffect(() => {
    async function loadAssignments() {
      try {
        const data = await getAssignments()

        setAssignments(
          data.map((assignment) => ({
            ...assignment,
            dueDate: assignment.due_date
              ? assignment.due_date.split('T')[0]
              : ''
          }))
        )
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadAssignments()
  }, [])

  const totalAssignments = assignments.length
  const completedAssignments = assignments.filter(
    (assignment) => assignment.completed
  ).length
  const remainingAssignments = totalAssignments - completedAssignments

  const now = new Date()
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

  const upcomingAssignments = assignments.filter(
    (assignment) =>
      !assignment.completed && assignment.dueDate >= today
  ).length

  const sortedAssignments = [...assignments].sort(
    (a, b) => a.dueDate.localeCompare(b.dueDate)
  )

  const overdueAssignments = sortedAssignments.filter(
    (assignment) =>
      !assignment.completed && assignment.dueDate < today
  )

  // Add an assignment to the database.
  async function addAssignment(event) {
    event.preventDefault()
    setError('')

    if (!title.trim() || !dueDate) {
      setError('Please enter an assignment name and due date.')
      return
    }

    try {
      const newAssignment = await createAssignment(
        title.trim(),
        dueDate
      )

      setAssignments((previousAssignments) => [
        ...previousAssignments,
        {
          ...newAssignment,
          dueDate: newAssignment.due_date
            ? newAssignment.due_date.split('T')[0]
            : ''
        }
      ])

      setTitle('')
      setDueDate('')
    } catch (error) {
      setError(error.message)
    }
  }

  // Update assignment completion in the database.
  async function toggleComplete(id) {
    setError('')

    const assignment = assignments.find(
      (item) => item.id === id
    )

    if (!assignment) {
      return
    }

    try {
      const updatedAssignment = await updateAssignment(
        id,
        !assignment.completed
      )

      setAssignments((previousAssignments) =>
        previousAssignments.map((item) =>
          item.id === id
            ? {
                ...item,
                completed: updatedAssignment.completed
              }
            : item
        )
      )
    } catch (error) {
      setError(error.message)
    }
  }

  // Delete an assignment from the database.
  async function removeAssignment(id) {
    setError('')

    try {
      await deleteAssignment(id)

      setAssignments((previousAssignments) =>
        previousAssignments.filter(
          (assignment) => assignment.id !== id
        )
      )
    } catch (error) {
      setError(error.message)
    }
  }

  function addCourse(event) {
    event.preventDefault()

    if (!courseName || !courseCode) {
      return
    }

    const newCourse = {
      id: Date.now(),
      name: courseName,
      code: courseCode
    }

    setCourses([...courses, newCourse])
    setCourseName('')
    setCourseCode('')
  }

  function removeCourse(id) {
    setCourses(courses.filter((course) => course.id !== id))
  }

  function addProject(event) {
    event.preventDefault()

    if (!projectName || !projectDescription) {
      return
    }

    const newProject = {
      id: Date.now(),
      name: projectName,
      description: projectDescription,
      tasks: []
    }

    setProjects([...projects, newProject])
    setProjectName('')
    setProjectDescription('')
  }

  function addProjectTask(projectId) {
    const taskName = taskInputs[projectId]

    if (!taskName || !taskName.trim()) {
      return
    }

    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: [
                ...project.tasks,
                {
                  id: Date.now(),
                  name: taskName.trim(),
                  completed: false
                }
              ]
            }
          : project
      )
    )

    setTaskInputs({ ...taskInputs, [projectId]: '' })
  }

  function toggleProjectTask(projectId, taskId) {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              )
            }
          : project
      )
    )
  }

  function removeProject(projectId) {
    setProjects(projects.filter((project) => project.id !== projectId))
  }

  return (
    <div className="app">
      <header>
        <h1>College Productivity Manager</h1>
        <p>Keep track of your courses, assignments, and deadlines.</p>
      </header>

      <main>
        {error && (
          <p role="alert" className="error-message">
            {error}
          </p>
        )}

        <section className="dashboard">
          <h2>Dashboard Overview</h2>

          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h3>Total Assignments</h3>
              <p>{totalAssignments}</p>
            </div>

            <div className="dashboard-card">
              <h3>Completed</h3>
              <p>{completedAssignments}</p>
            </div>

            <div className="dashboard-card">
              <h3>Remaining</h3>
              <p>{remainingAssignments}</p>
            </div>

            <div className="dashboard-card">
              <h3>Upcoming Deadlines</h3>
              <p>{upcomingAssignments}</p>
            </div>
          </div>
        </section>

        <section className="course-management">
          <h2>My Courses</h2>

          <form onSubmit={addCourse}>
            <input
              type="text"
              placeholder="Course name"
              value={courseName}
              onChange={(event) => setCourseName(event.target.value)}
            />

            <input
              type="text"
              placeholder="Course code (example: CS220)"
              value={courseCode}
              onChange={(event) => setCourseCode(event.target.value)}
            />

            <button type="submit">Add Course</button>
          </form>

          {courses.length === 0 ? (
            <p>No courses added yet. Add one above!</p>
          ) : (
            courses.map((course) => (
              <div className="assignment" key={course.id}>
                <div>
                  <h3>{course.name}</h3>
                  <p>{course.code}</p>
                </div>

                <button onClick={() => removeCourse(course.id)}>
                  Remove
                </button>
              </div>
            ))
          )}
        </section>

        <section className="assignment-form">
          <h2>Add an Assignment</h2>

          <form onSubmit={addAssignment}>
            <input
              type="text"
              placeholder="Assignment name"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <input
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
            />

            <button type="submit">Add Assignment</button>
          </form>
        </section>

        <section className="calendar">
          <h2>Calendar & Deadlines</h2>

          <h3>Overdue Assignments</h3>

          {overdueAssignments.length === 0 ? (
            <p>No overdue assignments. Great job!</p>
          ) : (
            overdueAssignments.map((assignment) => (
              <div className="assignment" key={assignment.id}>
                <div>
                  <h3>{assignment.title}</h3>
                  <p>Overdue: {assignment.dueDate}</p>
                </div>

                <button onClick={() => toggleComplete(assignment.id)}>
                  Complete
                </button>
              </div>
            ))
          )}

          <h3>Upcoming Assignments</h3>

          {sortedAssignments.filter(
            (assignment) =>
              !assignment.completed && assignment.dueDate >= today
          ).length === 0 ? (
            <p>No upcoming assignments.</p>
          ) : (
            sortedAssignments
              .filter(
                (assignment) =>
                  !assignment.completed && assignment.dueDate >= today
              )
              .map((assignment) => (
                <div className="assignment" key={assignment.id}>
                  <div>
                    <h3>{assignment.title}</h3>
                    <p>Due: {assignment.dueDate}</p>
                  </div>

                  <button onClick={() => toggleComplete(assignment.id)}>
                    Complete
                  </button>
                </div>
              ))
          )}
        </section>

        <section className="group-projects">
          <h2>Group Projects</h2>

          <form onSubmit={addProject}>
            <input
              type="text"
              placeholder="Project name"
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
            />

            <input
              type="text"
              placeholder="Project description"
              value={projectDescription}
              onChange={(event) =>
                setProjectDescription(event.target.value)
              }
            />

            <button type="submit">Add Project</button>
          </form>

          {projects.length === 0 ? (
            <p>No group projects yet. Add one above!</p>
          ) : (
            projects.map((project) => (
              <div className="assignment" key={project.id}>
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>

                  <h4>Project Tasks</h4>

                  {project.tasks.length === 0 ? (
                    <p>No tasks added yet.</p>
                  ) : (
                    project.tasks.map((task) => (
                      <div key={task.id}>
                        <label>
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() =>
                              toggleProjectTask(project.id, task.id)
                            }
                          />
                          <span
                            className={task.completed ? 'completed' : ''}
                          >
                            {task.name}
                          </span>
                        </label>
                      </div>
                    ))
                  )}

                  <input
                    type="text"
                    placeholder="Add a project task"
                    value={taskInputs[project.id] || ''}
                    onChange={(event) =>
                      setTaskInputs({
                        ...taskInputs,
                        [project.id]: event.target.value
                      })
                    }
                  />

                  <button
                    type="button"
                    onClick={() => addProjectTask(project.id)}
                  >
                    Add Task
                  </button>
                </div>

                <button onClick={() => removeProject(project.id)}>
                  Remove Project
                </button>
              </div>
            ))
          )}
        </section>

        <section className="assignment-list">
          <h2>My Assignments</h2>

          {loading ? (
            <p>Loading assignments...</p>
          ) : assignments.length === 0 ? (
            <p>No assignments yet. Add one above!</p>
          ) : (
            assignments.map((assignment) => (
              <div className="assignment" key={assignment.id}>
                <div>
                  <h3 className={assignment.completed ? 'completed' : ''}>
                    {assignment.title}
                  </h3>
                  <p>Due: {assignment.dueDate}</p>
                </div>

                <button onClick={() => toggleComplete(assignment.id)}>
                  {assignment.completed ? 'Undo' : 'Complete'}
                </button>

                <button onClick={() => removeAssignment(assignment.id)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  )
}

export default App