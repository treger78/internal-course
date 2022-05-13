export class Score {
  createScore(points) {
    const score = document.createElement('div');

    score.id = 'score';
    score.textContent = points;

    return score;
  }

  renderScore(score) {
    return document.getElementById('root').prepend(score);
  }

  updateScore(points) {
    return document.getElementById('score').textContent = points;
  }
};
