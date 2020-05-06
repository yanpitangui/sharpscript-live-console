using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ServiceStack.Script;

namespace SharpScript.LiveConsole.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ScriptContext _scriptContext;

        public HomeController(ILogger<HomeController> logger)
        {
            _scriptContext = new ScriptContext().Init();
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [Route("/linq/eval")]
        public async Task<IActionResult> Eval(string script)
        {
            try
            {
                return Ok(await _scriptContext.RenderScriptAsync(script ?? ""));

            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
