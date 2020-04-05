using LivestockTracker.Abstractions;
using System.ComponentModel.DataAnnotations;

namespace LivestockTracker.Models
{
    public class MedicineType : IEntity<int>
    {
        [Key]
        public int TypeCode { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty;

        public int GetKey()
        {
            return TypeCode;
        }
    }
}
