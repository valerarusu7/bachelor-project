export function filterCandidates(
  candidates,
  position,
  region,
  filterAll,
  filterCompleted,
  filterPending,
  filterFavorite,
  score,
  disableScore
) {
  if (region.name !== "All regions" && position.name !== "All positions") {
    if (filterAll) {
      return candidates.filter((candidate) => candidate.region == region.name && candidate.position == position.name);
    } else if (filterCompleted) {
      return candidates.filter(
        (candidate) => candidate.completed == true && candidate.region == region.name && candidate.position == position.name
      );
    } else if (filterPending) {
      return candidates.filter(
        (candidate) => candidate.completed == false && candidate.region == region.name && candidate.position == position.name
      );
    } else if (filterFavorite) {
      return candidates.filter(
        (candidate) => candidate.favorite == true && candidate.region == region.name && candidate.position == position.name
      );
    }
  } else if (position.name !== "All positions") {
    if (filterAll) {
      return candidates.filter((candidate) => candidate.position == position.name);
    } else if (filterCompleted) {
      return candidates.filter((candidate) => candidate.completed == true && candidate.position == position.name);
    } else if (filterPending) {
      return candidates.filter((candidate) => candidate.completed == false && candidate.position == position.name);
    } else if (filterFavorite) {
      return candidates.filter((candidate) => candidate.favorite == true && candidate.position == position.name);
    }
  } else if (region.name !== "All regions") {
    if (filterAll) {
      return candidates.filter((candidate) => candidate.region == region.name);
    } else if (filterCompleted) {
      return candidates.filter((candidate) => candidate.completed == true && candidate.region == region.name);
    } else if (filterPending) {
      return candidates.filter((candidate) => candidate.completed == false && candidate.region == region.name);
    } else if (filterFavorite) {
      return candidates.filter((candidate) => candidate.favorite == true && candidate.region == region.name);
    }
  } else {
    if (filterAll) {
      if (!disableScore) {
        return candidates.filter((candidate) => candidate.score > score[0] && candidate.score <= score[1]);
      } else {
        return candidates;
      }
    } else if (filterCompleted) {
      return candidates.filter((candidate) => candidate.completed == true);
    } else if (filterPending) {
      return candidates.filter((candidate) => candidate.completed == false);
    } else if (filterFavorite) {
      return candidates.filter((candidate) => candidate.favorite == true);
    }
  }
}

export function filterByScore(candidates, disableScore, score) {
  return !disableScore ? candidates.filter((candidate) => candidate.score > score[0] && candidate.score <= score[1]) : candidates;
}
