import { useState } from 'react'
import './App.css'

function App() {
  const [assignments, setAssignments] = useState([])
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')

  const [courses, setCourses] = useState([])
  const [courseName, setCourseName] = useState('')
  const [courseCode, setCourseCode] = useState('')

  const [projects, setProjects] = useState([])
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [taskInputs, setTaskInputs] = useState({})

  const totalAssignments = assignments.length
  const completedAssignments = assignments.filter(
    (assignment) => assignment.completed
  ).length
  const remainingAssignments = totalAssignments - completedAssignments

  const today = new Date().toISOString().split('T')[0]

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

  function addAssignment(event) {
    event.preventDefault()

    if (!title || !dueDate) {
      return
    }

    const newAssignment = {
      id: Date.now(),
      title: title,
      dueDate: dueDate,
      completed: false
    }

    setAssignments([...assignments, newAssignment])
    setTitle('')
    setDueDate('')
  }

  function toggleComplete(id) {
    setAssignments(
      assignments.map((assignment) =>
        assignment.id === id
          ? { ...assignment, completed: !assignment.completed }
          : assignment
      )
    )
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

          {assignments.length === 0 ? (
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
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  )
}

export default App