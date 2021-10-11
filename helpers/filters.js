export function filterCandidates(candidates, filter) {
  if (filter.region.name !== "All regions" && filter.position.name !== "All positions") {
    if (filter.filterAll) {
      return candidates.filter((candidate) => candidate.region == filter.region.name && candidate.position == filter.position.name);
    } else if (filter.filterCompleted) {
      return candidates.filter(
        (candidate) => candidate.completed == true && candidate.region == filter.region.name && candidate.position == filter.position.name
      );
    } else if (filter.filterPending) {
      return candidates.filter(
        (candidate) => candidate.completed == false && candidate.region == filter.region.name && candidate.position == filter.position.name
      );
    } else if (filter.filterFavorite) {
      return candidates.filter(
        (candidate) => candidate.favorite == true && candidate.region == filter.region.name && candidate.position == filter.position.name
      );
    }
  } else if (filter.position.name !== "All positions") {
    if (filter.filterAll) {
      return candidates.filter((candidate) => candidate.position == filter.position.name);
    } else if (filter.filterCompleted) {
      return candidates.filter((candidate) => candidate.completed == true && candidate.position == filter.position.name);
    } else if (filter.filterPending) {
      return candidates.filter((candidate) => candidate.completed == false && candidate.position == filter.position.name);
    } else if (filter.filterFavorite) {
      return candidates.filter((candidate) => candidate.favorite == true && candidate.position == filter.position.name);
    }
  } else if (filter.region.name !== "All regions") {
    if (filter.filterAll) {
      return candidates.filter((candidate) => candidate.region == filter.region.name);
    } else if (filter.filterCompleted) {
      return candidates.filter((candidate) => candidate.completed == true && candidate.region == filter.region.name);
    } else if (filter.filterPending) {
      return candidates.filter((candidate) => candidate.completed == false && candidate.region == filter.region.name);
    } else if (filter.filterFavorite) {
      return candidates.filter((candidate) => candidate.favorite == true && candidate.region == filter.region.name);
    }
  } else {
    if (filter.filterAll) {
      if (!filter.disableScore) {
        return candidates.filter((candidate) => candidate.score > filter.score[0] && candidate.score <= filter.score[1]);
      } else {
        return candidates;
      }
    } else if (filter.filterCompleted) {
      return candidates.filter((candidate) => candidate.completed == true);
    } else if (filter.filterPending) {
      return candidates.filter((candidate) => candidate.completed == false);
    } else if (filter.filterFavorite) {
      return candidates.filter((candidate) => candidate.favorite == true);
    }
  }
}

export function filterByScore(candidates, filter) {
  return !filter.disableScore
    ? candidates.filter((candidate) => candidate.score > filter.score[0] && candidate.score <= filter.score[1])
    : candidates;
}
