using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace wcm.Migrations
{
    /// <inheritdoc />
    public partial class InitResidentProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "ResidentProfiles");

            migrationBuilder.DropColumn(
                name: "CNIC",
                table: "ResidentProfiles");

            migrationBuilder.DropColumn(
                name: "EmergencyContactName",
                table: "ResidentProfiles");

            migrationBuilder.DropColumn(
                name: "EmergencyContactPhone",
                table: "ResidentProfiles");

            migrationBuilder.DropColumn(
                name: "FamilyMembers",
                table: "ResidentProfiles");

            migrationBuilder.DropColumn(
                name: "JoinedDate",
                table: "ResidentProfiles");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "ResidentProfiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "ResidentProfiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "ResidentProfiles",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "ResidentProfiles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UnitNumber",
                table: "ResidentProfiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "UnitNumber",
                table: "AspNetUsers",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "ResidentProfiles");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "ResidentProfiles");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "ResidentProfiles");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "ResidentProfiles");

            migrationBuilder.DropColumn(
                name: "UnitNumber",
                table: "ResidentProfiles");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "ResidentProfiles",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CNIC",
                table: "ResidentProfiles",
                type: "nvarchar(15)",
                maxLength: 15,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmergencyContactName",
                table: "ResidentProfiles",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmergencyContactPhone",
                table: "ResidentProfiles",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FamilyMembers",
                table: "ResidentProfiles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "JoinedDate",
                table: "ResidentProfiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<string>(
                name: "UnitNumber",
                table: "AspNetUsers",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);
        }
    }
}
