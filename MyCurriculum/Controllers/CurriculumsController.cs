using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyCurriculum.Models;

namespace MyCurriculum.DataContext
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurriculumsController : ControllerBase
    {
        private readonly Context _context;

        public CurriculumsController(Context context)
        {
            _context = context;
        }

        // GET: api/Curriculum
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Curriculum>>> GetCurriculums()
        {
            return await _context.Curriculums.ToListAsync();
        }

        // GET: api/Curriculum/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Curriculum>> GetCurriculum(int id)
        {
            var curriculum = await _context.Curriculums.FindAsync(id);

            if (curriculum == null)
            {
                return NotFound();
            }

            return curriculum;
        }

        // PUT: api/Curriculum/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCurriculum(int id, [FromForm]Curriculum curriculum)
        {
            if (id != curriculum.Id)
            {
                return BadRequest();
            }

            _context.Entry(curriculum).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CurriculumExists(id))
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

        // POST: api/Curriculum
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Curriculum>> PostCurriculum([FromForm]Curriculum curriculum)
        {
            _context.Curriculums.Add(curriculum);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCurriculum", new { id = curriculum.Id }, curriculum);
        }

        // DELETE: api/Curriculum/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCurriculum(int id)
        {
            var curriculum = await _context.Curriculums.FindAsync(id);
            if (curriculum == null)
            {
                return NotFound();
            }

            _context.Curriculums.Remove(curriculum);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CurriculumExists(int id)
        {
            return _context.Curriculums.Any(e => e.Id == id);
        }
    }
}
