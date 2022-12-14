using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace web_api.Migrations
{
    public partial class timestamps : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Timestamps",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    deviceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    timestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    energy_consumption = table.Column<float>(type: "real", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Timestamps", x => new { x.id, x.deviceId });
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Timestamps");
        }
    }
}
