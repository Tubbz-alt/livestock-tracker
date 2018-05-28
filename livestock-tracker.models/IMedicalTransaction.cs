﻿using LivestockTracker.Database;
using System;

namespace LivestockTracker.Models
{
    public interface IMedicalTransaction : IEntity
    {
        int AnimalID { get; set; }
        Animal AnimalObject { get; set; }
        decimal Dose { get; set; }
        MedecineType MedecineType { get; set; }
        int MedecineTypeCode { get; set; }
        DateTime TransactionDate { get; set; }
        int Unit { get; set; }
        Unit UnitObject { get; set; }
    }
}
