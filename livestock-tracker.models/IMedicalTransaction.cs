using LivestockTracker.Database;
using System;

namespace LivestockTracker.Models
{
    public interface IMedicalTransaction : IEntity
    {
        int ID { get; set; }
        int AnimalID { get; set; }
        Animal AnimalObject { get; set; }
        decimal Dose { get; set; }
        int MedicineTypeCode { get; set; }
        DateTimeOffset TransactionDate { get; set; }
        int Unit { get; set; }
    }
}
