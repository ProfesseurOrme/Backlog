<?php


namespace App\Controller;

use App\Entity\Game;
use App\Entity\Rating;
use App\Entity\Status;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/games/", name="api_rating")
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


}