using LivestockTracker;
using LivestockTracker.Database;
using LivestockTracker.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LivestockTracker.Controllers
{
  [Produces("application/json")]
  [Route("api/FeedType")]
  public class FeedTypeController : Controller
  {
    private readonly IFeedTypeRepository _feedTypeRepository;

    public FeedTypeController(IFeedTypeRepository feedTypeRepository)
    {
      _feedTypeRepository = feedTypeRepository;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
      return Ok(_feedTypeRepository.GetAll());
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
      return Ok(_feedTypeRepository.Get(id));
    }

    [HttpPost]
    public IActionResult Save([FromBody] FeedType feedType)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      _feedTypeRepository.Add(feedType);
      _feedTypeRepository.SaveChanges();

      return CreatedAtAction("Get", new { id = feedType.ID }, feedType);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] FeedType feedType)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (id != feedType.ID)
      {
        return BadRequest();
      }

      _feedTypeRepository.Update(feedType);

      try
      {
        _feedTypeRepository.SaveChanges();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (Get(id) == null)
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    [HttpPatch("{id}")]
    public IActionResult Patch(int id, [FromBody] FeedType feedType)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (id != feedType.ID)
      {
        return BadRequest();
      }


      FeedType updatedFeedType = null;
      try
      {
        _feedTypeRepository.Update(feedType);
        _feedTypeRepository.SaveChanges();
        updatedFeedType = _feedTypeRepository.Get(feedType.ID);
      }
      catch (EntityNotFoundException<FeedType> ex)
      {
        return NotFound(ex.Message);
      }
      catch (DbUpdateConcurrencyException)
      {
        if (updatedFeedType == null)
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return Ok(updatedFeedType);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var unit = _feedTypeRepository.Get(id);
      if (unit == null)
      {
        return NotFound();
      }

      _feedTypeRepository.Remove(unit);
      _feedTypeRepository.SaveChanges();

      return Ok(unit.ID);
    }
  }
}
