const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Issue B1: No Pagination
// Issue B2: Over-fetching (includes strategyNote)
router.get('/', async (req, res) => {
const page  = parseInt(req.query.page)  || 1;
const limit = parseInt(req.query.limit) || 20;
const skip  = (page - 1) * limit;

const [scores, total] = await Promise.all([
 prisma.score.findMany({
skip,
take: limit,
select: {
  id:     true,
  game:   true,
  player: true,
  score:  true,
  date:   true
  // strategyNote: intentionally omitted
},
orderBy: { date: 'desc' }
}),
  prisma.score.count()
]);

res.json({
  data: scores,
  meta: {
    total,
    page,
    limit,
    totalPages:  Math.ceil(total / limit),
    hasNextPage: page < Math.ceil(total / limit),
    hasPrevPage: page > 1
  }
});
});

module.exports = router;
