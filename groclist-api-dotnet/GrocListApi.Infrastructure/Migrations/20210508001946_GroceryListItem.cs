using Microsoft.EntityFrameworkCore.Migrations;

namespace GrocListApi.Infrastructure.Migrations
{
    public partial class GroceryListItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GroceryListItems",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    IsCollected = table.Column<bool>(nullable: false),
                    HasCoupon = table.Column<bool>(nullable: false),
                    GroceryListId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroceryListItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GroceryListItems_GroceryList_GroceryListId",
                        column: x => x.GroceryListId,
                        principalTable: "GroceryList",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GroceryListItems_GroceryListId",
                table: "GroceryListItems",
                column: "GroceryListId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroceryListItems");
        }
    }
}
