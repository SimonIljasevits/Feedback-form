using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FeedbackFormAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddSubjectAndClassNameToFeedback : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ClassName",
                table: "SubjectFeedback",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Subject",
                table: "SubjectFeedback",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClassName",
                table: "SubjectFeedback");

            migrationBuilder.DropColumn(
                name: "Subject",
                table: "SubjectFeedback");
        }
    }
}
