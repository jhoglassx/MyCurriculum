using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyCurriculum.DataContext;
using MyCurriculum.Models;

namespace MyCurriculum.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AcademicEducationsController : ControllerBase
    {
        private readonly Context _context;

        public AcademicEducationsController(Context context)
        {
            _context = context;
        }

        // GET: api/AcademicEducations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AcademicEducation>>> GetAcademicEducations()
        {
            return await _context.AcademicEducations.ToListAsync();
        }

        // GET: api/AcademicEducations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AcademicEducation>> GetAcademicEducation(int id)
        {
            var academicEducation = await _context.AcademicEducations.FindAsync(id);

            if (academicEducation == null)
            {
                return NotFound();
            }

            return academicEducation;
        }

        // PUT: api/AcademicEducations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAcademicEducation(int id, [FromBody] AcademicEducation academicEducation)
        {
            if (id != academicEducation.Id)
            {
                return BadRequest();
            }

            _context.Entry(academicEducation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AcademicEducationExists(id))
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

        // POST: api/AcademicEducations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AcademicEducation>> PostAcademicEducation([FromBody] AcademicEducation academicEducation)
        {
            _context.AcademicEducations.Add(academicEducation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAcademicEducation", new { id = academicEducation.Id }, academicEducation);
        }

        // DELETE: api/AcademicEducations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAcademicEducation(int id)
        {
            var academicEducation = await _context.AcademicEducations.FindAsync(id);
            if (academicEducation == null)
            {
                return NotFound();
            }

            _context.AcademicEducations.Remove(academicEducation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AcademicEducationExists(int id)
        {
            return _context.AcademicEducations.Any(e => e.Id == id);
        }
    }
}
