<?php


namespace App\Controller;

use App\Entity\Game;
use App\Entity\Rating;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/rating", name="api_rating")
 */
class ApiRatingController extends AbstractApiController
{
	private $entityManager;

	public function __construct(
		SerializerInterface $serializer,
		EntityManagerInterface $entityManager
	)
	{
		parent::__construct($serializer);
		$this->entityManager = $entityManager;
	}

	/**
	 * @Route("/reviews/games/{uuid}", name="_add", methods={"POST"})
	 */
	public function setGameRating(Game $game)
	{
		dd($game);
	}

	/**
	 * @Route("/reviews/games/{uuid}", name="_get", methods={"GET"})
	 */
	public function getGameRating(Game $game) {

		$review = $this->entityManager->getRepository(Rating::class)->findGameReview($game->getUuid(), $this->getUser());

		dd($review);
	}
}