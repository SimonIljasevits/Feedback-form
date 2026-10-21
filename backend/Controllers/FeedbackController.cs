using FeedbackFormAPI.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;

namespace FeedbackFormAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbackController : Controller
    {
        private AppDbContext _dbContext;

        public FeedbackController(AppDbContext context)
        {
            _dbContext = context;
        }

        [HttpPost]
        public IActionResult Submit([FromBody] SubjectFeedback feedback)
        {
            _dbContext.Add(feedback);
            _dbContext.SaveChanges();

            return Ok("Feedback is submitted to DB!");
        }

        [HttpGet]
        public IActionResult Get(int? id)
        {
            if (id is not null)
            {
                try
                {
                    return Ok(_dbContext.SubjectFeedback.Where(x => x.Id == id).First());
                }
                catch
                {
                    return BadRequest($"Requested feedback with id: {id} is nowhere to be found :(");
                }
            }

            return Ok(_dbContext.SubjectFeedback.ToList());
        }
    }
}
