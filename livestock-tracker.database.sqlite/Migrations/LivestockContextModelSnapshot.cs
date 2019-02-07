// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;

namespace LivestockTracker.Database.Migrations
{
  [DbContext(typeof(LivestockContext))]
    partial class LivestockContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.3-rtm-10026");

            modelBuilder.Entity("LivestockTracker.Models.Animal", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("ArrivalWeight");

                    b.Property<int>("BatchNumber");

                    b.Property<DateTimeOffset>("BirthDate");

                    b.Property<DateTimeOffset?>("DateOfDeath");

                    b.Property<bool>("Deceased");

                    b.Property<int>("Number");

                    b.Property<DateTimeOffset>("PurchaseDate");

                    b.Property<decimal>("PurchasePrice");

                    b.Property<DateTimeOffset?>("SellDate");

                    b.Property<decimal?>("SellPrice");

                    b.Property<bool>("Sold");

                    b.Property<string>("Subspecies")
                        .HasMaxLength(50);

                    b.Property<int>("Type");

                    b.HasKey("ID");

                    b.ToTable("Animal");
                });

            modelBuilder.Entity("LivestockTracker.Models.FeedingTransaction", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AnimalID");

                    b.Property<int>("FeedID");

                    b.Property<decimal>("Quantity");

                    b.Property<DateTimeOffset>("TransactionDate");

                    b.Property<int>("UnitTypeCode");

                    b.HasKey("ID");

                    b.ToTable("FeedingTransactions");
                });

            modelBuilder.Entity("LivestockTracker.Models.FeedType", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description")
                        .IsRequired();

                    b.HasKey("ID");

                    b.ToTable("FeedTypes");
                });

            modelBuilder.Entity("LivestockTracker.Models.MedicalTransaction", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AnimalID");

                    b.Property<decimal>("Dose");

                    b.Property<int>("MedicineTypeCode");

                    b.Property<DateTimeOffset>("TransactionDate");

                    b.Property<int>("Unit");

                    b.HasKey("ID");

                    b.HasIndex("AnimalID");

                    b.ToTable("MedicalTransactions");
                });

            modelBuilder.Entity("LivestockTracker.Models.MedicineType", b =>
                {
                    b.Property<int>("TypeCode")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.HasKey("TypeCode");

                    b.ToTable("Medicine");
                });

            modelBuilder.Entity("LivestockTracker.Models.Unit", b =>
                {
                    b.Property<int>("TypeCode")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.HasKey("TypeCode");

                    b.ToTable("Unit");
                });

            modelBuilder.Entity("LivestockTracker.Models.MedicalTransaction", b =>
                {
                    b.HasOne("LivestockTracker.Models.Animal", "AnimalObject")
                        .WithMany("MedicalTransactions")
                        .HasForeignKey("AnimalID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
