import { useState } from 'react'
import './App.css'

function App() {
  const [assignments, setAssignments] = useState([])
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')

  const totalAssignments = assignments.length
  const completedAssignments = assignments.filter(
    (assignment) => assignment.completed
  ).length
  const remainingAssignments = totalAssignments - completedAssignments

  const upcomingAssignments = assignments.filter(
    (assignment) =>
      !assignment.completed &&
      new Date(assignment.dueDate + 'T00:00:00') >= new Date(new Date().toDateString())
  ).length

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

  return (
    <div className="app">
      <header>
        <h1>College Productivity Manager</h1>
        <p>Keep track of your assignments and deadlines.</p>
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