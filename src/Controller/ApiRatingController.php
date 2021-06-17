<?php


namespace App\Controller;

use App\Entity\Game;
use App\Entity\Rating;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api", name="api_rating")
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
	 * @Route("/games/{uuid}/reviews/", name="_add", methods={"POST"})
	 */
	public function setGameRating(Request $request, Game $game) : Response
	{
		$rating = $this->deserializeData($request->getContent(),  Rating::class)
			->setAddedAt(new \DateTime())
			->setGame($game)
			->setUser($this->getUser())
		;
		$this->entityManager->persist($rating);
		$this->entityManager->flush();

			return $this->respondCreated("You have rated this game");
	}

	/**
	 * @Route("/games/{uuid}/reviews/", name="_get", methods={"GET"})
	 */
	public function getGameRating(Game $game) {

		$rating = $this->entityManager->getRepository(Rating::class)->findGameRating($game->getUuid(), $this->getUser());

		if($rating) {
			return $this->respond(["id" => $rating->getId(),"rating" => $rating->getRating(), "addedAt" => $rating->getAddedAt()]);
		} else {
			return $this->respondNotFound("You did not rate this game");
		}
	}
}