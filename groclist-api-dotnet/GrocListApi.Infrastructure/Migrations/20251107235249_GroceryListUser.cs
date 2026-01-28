using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GrocListApi.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class GroceryListUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GroceryListUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    GroceryListId = table.Column<int>(type: "INTEGER", nullable: false),
                    UserId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroceryListUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GroceryListUsers_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroceryListUsers_GroceryList_GroceryListId",
                        column: x => x.GroceryListId,
                        principalTable: "GroceryList",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GroceryListUsers_GroceryListId",
                table: "GroceryListUsers",
                column: "GroceryListId");

            migrationBuilder.CreateIndex(
                name: "IX_GroceryListUsers_UserId",
                table: "GroceryListUsers",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroceryListUsers");
        }
    }
}
