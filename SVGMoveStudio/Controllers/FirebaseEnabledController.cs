using Microsoft.AspNetCore.Mvc;
using SVGMoveStudio.Data;
using SVGMoveStudio.Models;

namespace SVGMoveStudio.Controllers
{
    public abstract class FirebaseEnabledController : ControllerBase
    {
        // Firebase ID tokens carry the uid in the "user_id" claim. Returns null for
        // anonymous callers instead of throwing, so it is safe on anonymous routes.
        protected string FirebaseUserId => User.FindFirst("user_id")?.Value;

        // True when the SVG exists and belongs to the signed-in caller.
        protected bool IsCurrentUsersSvg(SVG svg, UserRepository users)
        {
            if (svg == null || FirebaseUserId == null)
            {
                return false;
            }

            var currentUser = users.GetUserByFirebaseUid(FirebaseUserId);

            return currentUser != null && currentUser.UserId == svg.UserId;
        }
    }
}
