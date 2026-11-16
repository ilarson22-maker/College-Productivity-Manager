
const assignmentService = require("../src/services/assignmentService");

jest.mock("../src/models/assignmentModel", () => ({
    getAllAssignments: jest.fn(),
    createAssignment: jest.fn(),
    updateAssignment: jest.fn(),
    deleteAssignment: jest.fn()
}));

const assignmentModel = require("../src/models/assignmentModel");

describe("Assignment Service Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should return all assignments", async () => {
        const assignments = [{ id: 1, title: "Test Assignment" }];
        assignmentModel.getAllAssignments.mockResolvedValue(assignments);

        const result = await assignmentService.getAssignments();

        expect(result).toEqual(assignments);
    });

    test("should add an assignment", async () => {
        const assignment = { id: 1, title: "Programming Homework" };
        assignmentModel.createAssignment.mockResolvedValue(assignment);

        const result = await assignmentService.addAssignment(
            "Programming Homework",
            "2026-12-01"
        );

        expect(result).toEqual(assignment);
        expect(assignmentModel.createAssignment).toHaveBeenCalledWith(
            "Programming Homework",
            "2026-12-01"
        );
    });

    test("should trim extra spaces from assignment titles", async () => {
        assignmentModel.createAssignment.mockResolvedValue({
            id: 2,
            title: "Math Homework"
        });

        await assignmentService.addAssignment(
            "  Math Homework  ",
            "2026-12-05"
        );

        expect(assignmentModel.createAssignment).toHaveBeenCalledWith(
            "Math Homework",
            "2026-12-05"
        );
    });

    test("should reject an empty assignment title", async () => {
        await expect(
            assignmentService.addAssignment("", "2026-12-01")
        ).rejects.toThrow("Assignment title is required.");

        expect(assignmentModel.createAssignment).not.toHaveBeenCalled();
    });

    test("should reject a title containing only spaces", async () => {
        await expect(
            assignmentService.addAssignment("   ", "2026-12-01")
        ).rejects.toThrow("Assignment title is required.");

        expect(assignmentModel.createAssignment).not.toHaveBeenCalled();
    });

    test("should handle an error when loading assignments", async () => {
        assignmentModel.getAllAssignments.mockRejectedValue(
            new Error("Database error")
        );

        await expect(
            assignmentService.getAssignments()
        ).rejects.toThrow("Database error");
    });

    test("should handle an error when creating an assignment", async () => {
        assignmentModel.createAssignment.mockRejectedValue(
            new Error("Database error")
        );

        await expect(
            assignmentService.addAssignment("Homework", "2026-12-01")
        ).rejects.toThrow("Database error");
    });

    test("should update assignment completion status", async () => {
        const assignment = { id: 1, completed: true };
        assignmentModel.updateAssignment.mockResolvedValue(assignment);

        const result = await assignmentService.completeAssignment(1, true);

        expect(result).toEqual(assignment);
        expect(assignmentModel.updateAssignment).toHaveBeenCalledWith(1, true);
    });

    test("should delete an assignment", async () => {
        const assignment = { id: 1 };
        assignmentModel.deleteAssignment.mockResolvedValue(assignment);

        const result = await assignmentService.removeAssignment(1);

        expect(result).toEqual(assignment);
        expect(assignmentModel.deleteAssignment).toHaveBeenCalledWith(1);
    });
});
