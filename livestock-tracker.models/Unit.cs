﻿using LivestockTracker.Database;
using System.ComponentModel.DataAnnotations;

namespace LivestockTracker.Models
{
    public class Unit : IEntity
    {
        [Key]
        public int TypeCode { get; set; }
        public string Description { get; set; }

        public int GetKey()
        {
            return TypeCode;
        }
    }
}
