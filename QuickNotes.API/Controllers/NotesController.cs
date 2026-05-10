using QuickNotes.API.Data;
using QuickNotes.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace QuickNotes.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public NotesController(AppDbContext context) 
        {
            _context = context;

        }
        [HttpGet]
        public async Task<IActionResult> GetAll() 
        {
           var note = await _context.Notes.ToListAsync();
            return Ok(note);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var note = await _context.Notes.FindAsync(id);
            if(note == null) {  return NotFound(); }
            return Ok(note);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Note newNote)
        {
            var note = await _context.Notes.AddAsync(newNote);
            await _context.SaveChangesAsync();
            return Ok(newNote);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update (int id , Note UpdatedNote)
        {
            var note = await _context.Notes.FindAsync(id);
            if(note == null) { return NotFound(); ; }
             note.Title = UpdatedNote.Title;
            note.Content = UpdatedNote.Content;
            await _context.SaveChangesAsync();
            return Ok(note);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var note = await _context.Notes.FindAsync(id);
            if (note == null) { return NotFound(); ; }
            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}
